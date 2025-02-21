"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useLIFFContext } from "./context/LiffProvider";

export default function Home() {
  const { liff, liffError } = useLIFFContext();

  return (
    <section className="py-36">
      <div className="container flex items-center justify-center">
        <Card className="py-4 lg:w-3/4 xl:w-1/2">
          <CardBody className="overflow-visible py-2">
            <div className="flex gap-6 rounded-xs">
              <img
                alt="Shoe"
                className="flex-1 object-cover rounded-xs"
                width={50}
                src={
                  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=3460&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
              <div className="flex-1">
                <h2 className="text-lg font-bold uppercase">RTW Medicine</h2>
                <p className="text-sm text-default-500">Best Medicine .</p>

                <div className="mb-6 mt-2 flex gap-3">
                  <span className="font-bold">$279.79</span>
                  <span className="text-default-600 line-through">$350</span>
                  <span className="text-success">20% off</span>
                </div>

                <div className="mt-6 flex gap-6">
                  <Button color="primary">Buy now</Button>
                  <Button color="primary" variant="bordered" radius="full">
                    Add to bag
                  </Button>
                </div>
                {liff && <p className="mt-4">LIFF init succeeded.</p>}
                {liffError && (
                  <>
                    <p className="mt-4">LIFF init failed.</p>
                    <p>
                      <code>{liffError}</code>
                    </p>
                  </>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
