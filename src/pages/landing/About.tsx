import { ArrowRight, Eye, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full bg-white text-gray-900">
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-12 lg:py-20">
        <div className="max-w-xl">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <span className="h-px w-8 bg-blue-700" />
            About TaskFlow
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            A clearer view of where your money goes.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600">
            Money decisions feel easier when everything is in one place.
            TaskFlow helps you keep an eye on spending, plan with a budget, and
            make progress at your own pace.
          </p>
          <Link
            to="/features"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900"
          >
            Explore the features <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-24 w-24 border-l-2 border-t-2 border-emerald-500 sm:-left-4 sm:-top-4" />
          <img
            src="/LandingImg.png"
            alt="Expense tracking dashboard shown on a laptop and phone"
            className="relative aspect-[4/3] w-full object-contain shadow-xl shadow-blue-800/15"
          />
          <div className="absolute -bottom-4 rounded-lg right-3 flex items-center gap-3 bg-white px-4 py-3 shadow-lg sm:right-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Eye className="size-4" />
            </span>
            <div>
              <p className="text-xs font-medium text-gray-500">Built around</p>
              <p className="text-sm font-semibold text-gray-900">
                everyday clarity
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-200 bg-gray-50/80">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
          <div className="mb-9 max-w-xl">
            <p className="text-sm font-semibold text-emerald-700">
              What matters to us
            </p>
            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Good money habits start with a clear picture.
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3 md:gap-10">
            <article className="border-t-2 border-blue-700 pt-5">
              <Eye className="size-5 text-blue-700" />
              <h3 className="mt-4 text-lg font-semibold">Clarity first</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                See your income, expenses, and budgets together, without the
                guesswork.
              </p>
            </article>
            <article className="border-t-2 border-emerald-600 pt-5">
              <ShieldCheck className="size-5 text-emerald-700" />
              <h3 className="mt-4 text-lg font-semibold">
                Your money, your call
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Tools should support your choices, not tell you what your goals
                should be.
              </p>
            </article>
            <article className="border-t-2 border-amber-500 pt-5">
              <Sparkles className="size-5 text-amber-600" />
              <h3 className="mt-4 text-lg font-semibold">
                Progress over perfection
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Small, steady steps can make managing everyday finances feel
                more doable.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <div>
          <h2 className="text-xl font-semibold">
            Have a question about TaskFlow?
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            We’d be glad to hear from you.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex h-10 items-center justify-center gap-2 self-start bg-blue-700 px-4 rounded-lg text-sm font-medium text-white transition-colors hover:bg-blue-800 md:self-auto"
        >
          Get in touch <ArrowRight className="size-4" />
        </Link>
      </section>
    </div>
  );
};

export default About;
