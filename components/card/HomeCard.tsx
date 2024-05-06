import React from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export default function HomeCard() {
    const cardHeights: number[] = [600, 300, 300];

    return (
      <div className="max-w-full gap-2 grid grid-cols-12 px-24 py-2">
          {cardHeights.map((cardHeightsht: number, index: number) => (
              <Card
                  key={index}
                  isFooterBlurred
                  className={`w-full h-[${cardHeightsht}px] col-span-12 sm:col-span-4`}
              >
                  <Image
                      removeWrapper
                      alt="Card example background"
                      className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                      src="https://nextui.org/images/card-example-6.jpeg"
                  />
                  <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-end">
                      <Button className="text-tiny" color="primary" radius="full" size="sm">
                          Notify Me
                      </Button>
                  </CardFooter>
              </Card>
          ))}
      </div>
    );
  }
  