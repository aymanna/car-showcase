import Hero from '@/components/Hero';
import SearchBar from '@/components/SearchBar';
import CustomFilter from '@/components/CustomFilter';
import CarCard from '@/components/CarCard';
import ShowMore from '@/components/ShowMore';
import { baseLimit, fuels, yearsOfProduction } from '@/constants';
import { fetchCars } from '@/utils';
import { HomeProps } from '@/types';

export default async function Home({ searchParams }: HomeProps) {
  const { manufacturer, year = 2022, fuel, limit = baseLimit, model } = searchParams;

  const allCars = await fetchCars({ manufacturer, year, fuel, limit, model });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => <CarCard car={car} key={car} />)}
            </div>

            <ShowMore
              pageNumber={Math.round(limit / baseLimit)}
              isNext={limit > allCars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">
              {Object.keys(searchParams).length === 0
                ? 'Find your dream car!'
                : 'Oops, no results'}
            </h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
