const Features = () => {
  const cards = [
    {
      title: "Expense Tracking",
      info: "Track expenses in real time with automatic categorization"
    },
    {
      title: "Smart Budgeting",
      info: "Create budgets, and stay on track"
    },
    {
      title: "Reports & Analytics",
      info: "Great reports to understand your money"
    },
    {
      title: "Multi-Device Sync",
      info: "Access your data anytime, anywhere"
    },
    {
      title: "Secure & Private",
      info: "Your data is encrypted and always protected"
    },
  ]
  return (
    <div className="w-full min-h-screen px-3 py-6">
      <h2 className="text-4xl font-medium text-center text-gray-800 tracking-wide">
        Powerful Features To <br /> Simplify Your Finances
      </h2>
      <p className="text-lg font-medium text-gray-700 track-wider mt-4 text-center">
        Everything you need to track expenses and income, <br /> manage budgets,
        and achieve your financial goals
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        { cards.map(card => (
          <div className="w-full flex flex-col gap-3 rounded-sm shadow-sm shadow-gray-400 items-start px-6 py-4" key={card.title}>
            <h2 className="text-lg font-medium">{card.title}</h2>
            <p className="font-medium">{card.info}</p>

          </div>
        ))
}
      </div>
    </div>
  );
};

export default Features;
