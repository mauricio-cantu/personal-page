import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const slices = getSlices((await searchParams).state);

  return (
    <SliceSimulator>
      <SliceZone slices={slices} components={components} />
    </SliceSimulator>
  );
}
