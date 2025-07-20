"use client";
import { Spotlight } from "~/components/ui/spotlight-new";
import { Button, buttonVariants } from "~/components/ui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "~/components/ui/animated-modal";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "~/components/ui/select";
import { useForm, type AnyFieldApi } from "@tanstack/react-form";
import saveToWaitlist from "~/lib/saveToWaitlist";
import {waitlistEntry, type WaitlistEntry} from "~/shemas";
import { useAnimate } from "motion/react";
import {TextMorph} from "~/components/ui/text-morph";
import {useRef, useState} from "react";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}


export default function HomePage() {
    const [scope, animate] = useAnimate()
    const page = useRef<HTMLDivElement>(null)
    const [title, setTitle] = useState({
        one: "Sign up for",
        two: "KeyVaro",
        three: "Waitlist!"
    })
    const [enteredTheWaitlist, setEnteredTheWaitlist] = useState(false)
    const [loading, setLoading] = useState(false)

    // @ts-ignore
    const form = useForm<WaitlistEntry>({
    defaultValues: {
      name: "",
      email: "",
      type: "Consumer"
    },
      validators: {
        onChange: waitlistEntry
      },
    onSubmit: async ({value, formApi}) => {
        setLoading(true)
        await saveToWaitlist(value)
        setLoading(false);
        setEnteredTheWaitlist(true)
        formApi.reset();

        async function an(){
            setTitle({
                one: "Thanks for",
                two: "Joining",
                three: "KeyVaro!"
            })
            await animate(
                ".field",
                { opacity: 0, y: -20, userSelect: "none", pointerEvents: "none"},
                { duration: 0.3, delay: i => i * 0.1 }
            )

            await animate(
                "#heart",
                {opacity: 1}
            )

                await animate(
                    "#heart",
                    {scale: [1, 1.2, 1]},
                    {repeat: 10, duration: 0.8, ease: "circInOut"}
                )

            await new Promise((resolve) => setTimeout(resolve, 3000));

            const closeIcon = document.getElementById("close-modal-icon");
            if (closeIcon) {
                closeIcon.click();
            }

            setEnteredTheWaitlist(true)
        }

        void an()





    }
  })

  return (
    <main ref={page} className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <Spotlight />
      <div className="relative z-50 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-6xl font-bold text-transparent md:text-9xl">
          KeyVaro <br />
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-xl font-normal text-neutral-300">
          Unlock your next stay with a smartphone.
        </p>
        <div className={"z-50 mt-8 flex w-full justify-center gap-4"}>
          <Modal >

              {enteredTheWaitlist ?<Button disabled variant={"default"} size={"lg"}>Thank you!</Button> :<ModalTrigger

                  className={buttonVariants({
                      variant: "destructive",
                      size: "lg",
                      className: "bg-foreground! text-background! cursor-pointer",
                  })}

              >
                  {/*<Button variant={"default"} size={"lg"} className={'cursor-pointer'}>*/}
                  Enter the Waitlist
                  {/*</Button>*/}
              </ModalTrigger>
              }

            <ModalBody className={"mx-8 min-w-[80vw] md:min-w-[45vw]"} >
              <ModalContent  >
                <h4 className="mx-auto inline-flex gap-2 items-center mb-8 text-center text-lg font-bold text-neutral-600 md:text-2xl dark:text-neutral-100">
                 <TextMorph>
                     {title.one}
                 </TextMorph>{" "}
                  <span className="rounded-md border border-gray-200 bg-gray-100 px-1 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                    <TextMorph>
    {title.two}
                    </TextMorph>
                  </span>{" "}
                  <TextMorph>
                      {title.three}
                  </TextMorph>
                </h4>

              {/* Waitlist form */}
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }} ref={scope}>

<span className={'absolute -z-10 right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 text-9xl opacity-0 '} id={'heart'}>🩷</span>
                  
                  {/* Name */}
                <form.Field
                name={"name"}
                children={(fieldApi) => (
                  <div className="space-y-2 field" >
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        value={fieldApi.state.value}
onChange={e => fieldApi.handleChange(e.target.value)}
                        onBlur={fieldApi.handleBlur}
                    />
                    <FieldInfo field={fieldApi}/>
                  </div>)
                }
                />


                <form.Field
                    name={"email"}
                    children={(fieldApi) => (
                        <div className="space-y-2 field">
                          <Label htmlFor="email">Email</Label>
                          <Input
                              id="email"
                              placeholder="johndoe@example.com"
                              value={fieldApi.state.value}
                              onChange={e => fieldApi.handleChange(e.target.value)}
                              onBlur={fieldApi.handleBlur}
                          />
                          <FieldInfo field={fieldApi}/>
                        </div>)
                    }
                />

                <form.Field
                    name={"type"}
                    children={(fieldApi) => (

                        <div className={'space-y-2 field'}>
                          <Label htmlFor="type">Type</Label>
                          <Select
                              value={fieldApi.state.value}
                              onValueChange={v => fieldApi.handleChange(v)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                <SelectItem value="Consumer">Consumer</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>


                )
                    }
                />


              </form>
            </ModalContent>
            <ModalFooter className="gap-4">
              <Button
                className="w-28 rounded-md border border-gray-300 bg-gray-200 px-2 py-1 text-sm text-black dark:border-black dark:bg-black dark:text-white"
                type="button"
                data-close-modal
              >
                Cancel
              </Button>
              <Button
                  disabled={!form.state.canSubmit || loading || form.state.isSubmitted ||enteredTheWaitlist}
                className="w-28 rounded-md border border-black bg-black px-2 py-1 text-sm text-white dark:bg-white dark:text-black"
                  onClick={form.handleSubmit}
              >
                {loading ? "Submitting..." : enteredTheWaitlist ? "Thank you!" : "Let's go!"}
              </Button>
            </ModalFooter>
            </ModalBody>
          </Modal>
          <Button variant={"outline"} size={"lg"} className={"cursor-pointer"}>
            Explore
          </Button>
        </div>
      </div>
    </main>
  );
}
