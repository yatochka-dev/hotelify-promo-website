'use client'
import {Spotlight} from "~/components/ui/spotlight-new";
import {Button, buttonVariants} from "~/components/ui/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger} from "~/components/ui/animated-modal";

export default function HomePage() {
  return (
      <main className="h-screen w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight />
          <div className=" p-4 max-w-7xl  mx-auto relative z-50  w-full pt-20 md:pt-0">
              <h1 className="text-6xl md:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                  KeyVaro <br />
              </h1>
              <p className="mt-4 font-normal text-xl text-neutral-300 max-w-lg text-center mx-auto">
                  Unlock your next stay with a smartphone.
              </p>
              <div className={'w-full flex justify-center gap-4 mt-8 z-50'} >
                  <Modal>
                      <ModalTrigger className={buttonVariants({variant: 'destructive', size: 'lg', className: 'cursor-pointer bg-foreground! text-background!'})} >
                          {/*<Button variant={"default"} size={"lg"} className={'cursor-pointer'}>*/}
                              Enter the Waitlist
                          {/*</Button>*/}
                      </ModalTrigger>
                      <ModalBody>
                          <ModalContent>
                              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                                  Sign up for {" "}
                                  <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                KeyVaro
              </span>{" "}
                                  Waitlist! 🏨
                              </h4>
                          </ModalContent>
                          <ModalFooter className="gap-4">
                              <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
                                  Cancel
                              </button>
                              <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
                                  Let's go!
                              </button>
                          </ModalFooter>
                      </ModalBody>

                  </Modal>
                  <Button variant={"outline"} size={"lg"} className={'cursor-pointer'}>
Explore
                  </Button>
              </div>
          </div>
      </main>
  );
}
