import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center justify-center rounded-br-3xl rounded-tl-3xl border border-teal-500 p-3 text-center sm:flex-row">
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <h2 className="text-2xl font-bold">
          Want to learn more about Crypto Currencies?
        </h2>
        <p className="text-gray-500">
          Download our free PDF guide to get started
        </p>
        <Button gradientDuoTone="purpleToBlue">Get PDF Guide</Button>
      </div>
      <div className="flex-1 p-7">
        <img
          src="https://www.livemint.com/lm-img/img/2024/04/17/600x338/bitcoin_1713368836739_1713368836922.jpg"
          alt="bitcoin"
          className="rounded-3xl"
        />
      </div>
    </div>
  );
}
