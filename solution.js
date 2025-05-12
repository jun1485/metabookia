function solution(products, purchased) {
  // 1. 제품 정보 파싱: 각 제품의 이름과 특성들을 저장합니다.
  // productInfo 예시: { "sofa": ["red", "long"], "blanket": ["blue", "long"], ... }
  const productInfo = {};
  products.forEach((p) => {
    const parts = p.split(" ");
    const name = parts[0];
    const features = parts.slice(1);
    productInfo[name] = features;
  });

  // 2. 고객이 구매한 제품들의 특성 빈도수 계산
  // purchasedFeatureCounts 예시: { "red": 1, "long": 2, ... }
  const purchasedFeatureCounts = {};
  purchased.forEach((purchasedName) => {
    // productInfo에 해당 제품이 있는 경우에만 특성을 가져옵니다. (문제 조건상 항상 있어야 함)
    if (productInfo[purchasedName]) {
      productInfo[purchasedName].forEach((feature) => {
        purchasedFeatureCounts[feature] =
          (purchasedFeatureCounts[feature] || 0) + 1;
      });
    }
  });

  // 3. 특성 우선순위 결정
  // sortedUniquePurchasedFeatures 예시: ["long", "blue", "cheap", "red"] (예제1 기준)
  // (등장 횟수 내림차순, 같으면 사전순 오름차순)
  const sortedUniquePurchasedFeatures = Object.keys(
    purchasedFeatureCounts
  ).sort((a, b) => {
    const countDiff = purchasedFeatureCounts[b] - purchasedFeatureCounts[a];
    if (countDiff !== 0) {
      return countDiff;
    }
    return a.localeCompare(b);
  });

  // featurePriorityMap 예시: { "long": 0, "blue": 1, "cheap": 2, "red": 3 } (낮을수록 우선순위 높음)
  const featurePriorityMap = {};
  sortedUniquePurchasedFeatures.forEach((feature, index) => {
    featurePriorityMap[feature] = index;
  });

  // 4. 추천 대상 제품 필터링 (구매하지 않은 제품)
  const purchasedSet = new Set(purchased);
  let candidateProductNames = Object.keys(productInfo).filter(
    (name) => !purchasedSet.has(name)
  );

  // 4.1 추천 대상 제품 중 유효한 특성(구매된 특성)이 하나도 없는 제품은 제외
  candidateProductNames = candidateProductNames.filter((name) => {
    const features = productInfo[name] || [];
    return features.some((feature) =>
      featurePriorityMap.hasOwnProperty(feature)
    );
  });

  if (candidateProductNames.length === 0) {
    return ""; // 추천할 유효한 제품이 없는 경우
  }

  // 5. 후보 제품들의 특성을 우선순위 값의 배열로 변환하는 함수
  const getProductFeaturePriorities = (productName) => {
    const features = productInfo[productName] || [];
    return features
      .filter((feature) => featurePriorityMap.hasOwnProperty(feature)) // 구매 특성에 있는 것만 고려
      .map((feature) => featurePriorityMap[feature]) // 우선순위 값으로 변환
      .sort((a, b) => a - b); // 우선순위 값 오름차순 정렬
  };

  // 6. 제품 우선순위 비교 및 정렬
  candidateProductNames.sort((nameA, nameB) => {
    const prioritiesA = getProductFeaturePriorities(nameA);
    const prioritiesB = getProductFeaturePriorities(nameB);

    const lenA = prioritiesA.length;
    const lenB = prioritiesB.length;
    const minLen = Math.min(lenA, lenB);

    // 각 제품의 특성 우선순위를 순서대로 비교
    for (let i = 0; i < minLen; i++) {
      if (prioritiesA[i] !== prioritiesB[i]) {
        // prioritiesA[i]가 더 작으면 (우선순위가 높으면) nameA가 앞으로 온다 (음수 반환)
        return prioritiesA[i] - prioritiesB[i];
      }
    }

    // 앞부분 특성 우선순위가 모두 동일한 경우,
    // "비교할 특성이 먼저 바닥난 제품의 우선순위가 상대적으로 낮습니다."
    // 즉, 유효 특성 리스트가 더 긴 쪽이 우선순위가 높다.
    // lenA가 더 길면 nameA가 우선 (음수 반환 필요)
    return lenB - lenA; // lenB가 크면 양수 (nameB가 뒤로), lenA가 크면 음수 (nameA가 앞으로)
  });

  // 정렬된 후보 목록의 첫 번째 제품을 반환
  return candidateProductNames.length > 0 ? candidateProductNames[0] : "";
}
