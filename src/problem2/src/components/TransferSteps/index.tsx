interface ITransferSteps {
  from: string;
  to: string
}

export default function TransferSteps({ from, to }: ITransferSteps) {

  const steps = [
    {
      "title": 'Enter your amount',
      "description": "Simply enter the amount you want to convert."
    },
    {
      "title": "Choose your currencies",
      "description": "Select From in the first dropdown as the currency you want to convert from, and to in the second dropdown as the currency you want to receive"
    },
    {
      "title": "You're done",
      "description": `Our currency converter will show you the current ${from} to ${to} exchange rate.`
    },
  ]

  return (
    <div className="">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        How to convert from {from} to {to}
      </h2>

      <section className="bg-white rounded-xl shadow p-10 w-full max-w-[95vw] md:!max-w-4xl mx-auto text-black">
        <div className="grid grid-rows-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-[#f3f5f2] rounded-2xl p-6 text-gray-900 shadow-sm"
            >
              <div className="text-3xl font-bold mb-2">{index + 1}</div>
              <div className="text-lg font-semibold mb-2">{step.title}</div>
              <p className="text-sm text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
