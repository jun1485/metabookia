"use client";

import { useState } from "react";
import { BookSeries } from "../data/types/book";
import SeriesTabs from "./SeriesTabs";
import SeriesDetail from "./SeriesDetail";

interface BookSeriesListProps {
  seriesList: BookSeries[];
}

export default function BookSeriesList({ seriesList }: BookSeriesListProps) {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(
    seriesList.length > 0 ? seriesList[0].id : null
  );

  const handleSeriesClick = (seriesId: string) => {
    setSelectedSeries(seriesId);
  };

  const currentSeries = seriesList.find(
    (series) => series.id === selectedSeries
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 시리즈 탭 메뉴 */}
        <SeriesTabs
          seriesList={seriesList}
          selectedSeries={selectedSeries}
          onSelectSeries={handleSeriesClick}
        />

        {/* 선택된 시리즈의 책 목록 */}
        <SeriesDetail series={currentSeries} />
      </div>
    </div>
  );
}
