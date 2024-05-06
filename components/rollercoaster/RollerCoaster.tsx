import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { Image } from '@nextui-org/image';
import { MenuList } from './menu';

type MenuItem = {
  img: string;
};

export default function CarouselComponent() {
  const [menu, setMenu] = useState<MenuItem[]>(MenuList);

  return (
    <div className="mt-5 mb-8 flex w-full items-center justify-center">
      <Marquee pauseOnHover={true} className="h-[500px] overflow-hidden">
        {menu.map((item, index) => (
          <div key={index} className="mx-5 flex h-[500px] flex-col items-center justify-center pr-10">
            <Image
              src={item.img}
              className="w-60 rounded-none"
              alt=""
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
