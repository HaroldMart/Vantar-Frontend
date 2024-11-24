import Image from "next/image";
import { BiSolidChevronLeft, BiSolidChevronRight } from "react-icons/bi";

export function Banner() {
  return (
    <div
      className="flex h-screen items-start p-6 flex-1 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1616401776146-ae3453da7105?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="flex flex-col items-end bg-black bg-opacity-30 backdrop-blur-md rounded-2xl p-8 mt-auto w-full">
        <div className="flex flex-col gap-4 w-full text-white">
          <p className="text-2xl font-medium">
            “Untitled has saved us thousands of hours of work. We are able to
            spin up projects faster and take on more clients.”
          </p>
          <div className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-xl font-semibold">Lula Meyers</h3>
              <Image
                src="/images/stars-5.png"
                width={100}
                height={16}
                alt="5 stars"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col">
                <p className="text-lg font-semibold">
                  Product Manager, Hourglass
                </p>
                <p className="text-base">Web Design Agency</p>
              </div>
              <div className="flex gap-2">
                <a
                  className="flex items-center justify-center w-14 h-14 rounded-full border border-white bg-opacity-20 transition duration-150 hover:bg-white hover:bg-opacity-20"
                >
                  <BiSolidChevronLeft size={24} className="text-white" />
                </a>
                <a
                  className="flex items-center justify-center w-14 h-14 rounded-full border border-white bg-opacity-20 transition duration-150 hover:bg-white hover:bg-opacity-20"
                >
                  <BiSolidChevronRight size={24} className="text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
