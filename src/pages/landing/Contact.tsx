import { ArrowRight, Clock3, Mail, MapPin, MessageCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import emailjs from "@emailjs/browser"
import { useState } from "react"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const publicKey = import.meta.env.VITE_API_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_API_SERVICE_ID;
  const templateId = import.meta.env.VITE_API_TEMPLATE_ID;

  const params = {
    name, email, message
  }

  const sendHandler = async (e: FormEvent<HTMLFormEvent>) => {
    e.preventDefault();

    const options = emailjs.init({
    publicKey,
    blockHeadless: true,
    blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
    }})

    try {
      emailjs.send(serviceId, templateId, params, options);
    } catch(err) {
      console.log("Error sending email, ", err);
    }

    setName("");
    setEmail("");
    setMessage("");
  }
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 sm:px-4">
          <h1 className="text-4xl font-semibold leading-tight text-gray-900 sm:text-5xl">Let’s talk about your finances.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-gray-600">Questions, feedback, or just want to say hello? Send us a note and our team will be happy to help.</p>

        <div className="grid overflow-hidden border border-gray-200 bg-white shadow-sm md:grid-cols-[0.8fr_1.2fr] ">
          <aside className="relative overflow-hidden bg-blue-950 px-6 py-8 text-white sm:px-8 sm:py-10">
            <div className="absolute -right-14 -top-14 size-48 rounded-full border border-white/10" />
            <div className="absolute -right-6 -top-6 size-32 rounded-full border border-emerald-300/30" />
            <div className="relative">
              <span className="flex size-11 items-center justify-center rounded-md bg-emerald-400 text-blue-950"><MessageCircle className="size-5" /></span>
              <h2 className="mt-7 text-2xl font-semibold">We’re here to help.</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-blue-100">Reach out with a question or share what would make TaskFlow work better for you.</p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-emerald-300" />
                  <div>
                    <p className="text-xs font-medium text-blue-200">Email</p>
                    <a href="mailto:jeankymj@gmail.com" className="mt-1 block text-sm hover:text-emerald-200">jeankymj@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-0.5 size-4 text-emerald-300" />
                  <div>
                    <p className="text-xs font-medium text-blue-200">Response time</p>
                    <p className="mt-1 text-sm">Usually within one business day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-emerald-300" />
                  <div>
                    <p className="text-xs font-medium text-blue-200">Based online</p>
                    <p className="mt-1 text-sm">Here for you, wherever you are</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="px-6 py-8 sm:px-9 sm:py-10">
            <h2 className="text-xl font-semibold text-gray-900">Send us a message</h2>
            <p className="mt-1 text-sm text-gray-500">Fill in the details below and we’ll be in touch.</p>

            <form className="mt-7 space-y-5" onSubmit={sendHandler}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Your name
                  <Input name="name" placeholder="Name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="space-y-2 text-sm font-medium text-gray-700">
                  Email address
                  <Input name="email" type="email" placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                </label>
              </div>
              
              <label className="block space-y-2 text-sm font-medium text-gray-700">
                Message
                <Textarea name="message" placeholder="Write your message..." className="min-h-32 resize-y" onChange={(e) => setMessage(e.target.value)} />
              </label>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-gray-500">We’ll only use your details to respond.</p>
                <Button type="submit" className="gap-2 bg-blue-700 text-white hover:bg-blue-800">
                  Send message <ArrowRight className="size-4" />
                </Button>
              </div>
            </form>
          </section>
        </div>
    </main>
  )
}

export default Contact