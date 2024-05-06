"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
// import SubscriptionDialog from "@/components/subscription-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, SendHorizonal, SendHorizontalIcon, Zap } from "lucide-react";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { useFormState, useFormStatus } from "react-dom";
import { createAiTest } from "@/actions/test";
import { useUser } from "@clerk/nextjs";
// import { useClerk, useUser } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { AddFreeCredits } from "@/lib/actions";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit" className="">
      {!pending ? (
        <>
          <SendHorizontalIcon className="h-5 w-5 mr-2 text-primary" />
        </>
      ) : (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
        </>
      )}
    </button>
  );
}

export default function Chat() {
  // const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);

  // const { isLoaded, isSignedIn, user } = useUser();
  // const { openSignIn, session } = useClerk();

  // const credits = user?.publicMetadata?.credits;
  // const newUser = typeof credits === "undefined";
  // const paidUser = user?.publicMetadata?.stripeCustomerId;

  const { toast } = useToast();
  const [state, formAction] = useFormState(createAiTest, null);
  const { user,  } = useUser();


  const ref = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "Ditch the test writing grind! Let me, your AI Test Generator buddy, handle it.  Provide details about your test: title, description, duration (seconds), and an optional price. I'll use my AI magic to generate a well-structured, time-efficient test specification that saves you precious time!",
        },
      ],
      onResponse: (response) => {
        if (!response.ok) {
          const status = response.status;

          switch (status) {
            case 401:
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
              break;
            case 402:
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
              break;
            default:
              // toast.error(error?.message || "Something went wrong!");
              toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error?.message || "Something went wrong!",
                action: (
                  <ToastAction altText="Try again">Try again</ToastAction>
                ),
              });
              break;
          }
        }
        // session?.reload();
      },
    });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // if (isSignedIn) {

    // } else {
    //   openSignIn();
    // }
    handleSubmit(e);
  }

  // async function handleClick() {
  //   const { success, error } = await AddFreeCredits();

  //   if (error) {
  //     toast.error(error);
  //     return;
  //   }

  //   toast.success("10 credits added successfully.");
  //   session?.reload();
  // }

  return (
    <section className="pt-0 text-zinc-700 h-[500px] ">
      <div className="max-w-4xl mx-auto">
        {/* Credits section */}
        <div className="mx-auto flex max-w-2xl items-center justify-between px-1">
         {
          messages.length < 2 && <div className="space-y-4 absolute top-[20%]">
          <h1 className="font-serif text-2xl font-medium">Certi-AI Chatbot</h1>
           <h1 className="font-serif text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-500 to-indigo-400">Hello, {user?.fullName}</h1>
          <p className="font-serif text-3xl font-semibold text-gray-400">How can I help you today?</p>
          </div>
         }

          {/* <div>
            {isSignedIn && newUser && (
              <Button
                size="sm"
                variant="outline"
                className="border-emerald-500"
                onClick={handleClick}
              >
                Redeem 10 Free Credits
              </Button>
            )}
            {isSignedIn && typeof credits === "number" && (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-zinc-500">Credits:</span>
                <span className="font-medium">{credits}</span>
              </div>
            )}
          </div> */}

          {/* {isSignedIn && !paidUser && !newUser && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSubscriptionDialogOpen(true)}
            >
              Get more credits
            </Button>
          )} */}
        </div>

        {/* Chat area */}
        <div className="mx-auto  mt-3 w-full">
          <ScrollArea
            className="mb-2 h-[500px] p-4 border-b-2"
            // ref={ref}
          >
            {messages.map((m) => (
              <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
                {m.role === "user" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="text-sm">U</AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5">
                      <p className="font-semibold">You</p>
                      <div className="mt-1.5 text-sm text-zinc-500">
                        {m.content}
                      </div>
                    </div>
                  </div>
                )}

                {m.role === "assistant" && (
                  <div className="mb-6 flex gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-emerald-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="mt-1.5 w-full">
                      <div className="flex justify-between">
                        <p className="font-semibold">Bot</p>
                        {/* <CopyToClipboard message={m} className="-mt-1" /> */}
                      </div>
                      <div className="mt-2 text-sm text-zinc-500">
                        {m.content}
                      </div>
                      <form action={formAction} className="mt-2">
                        <input
                          hidden
                          value={m.content}
                          type="text"
                          name="test"
                        />
                        <SubmitButton />
                      </form>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ScrollArea>

          <form onSubmit={onSubmit} className="relative w-full">
            <Input
              name="message"
              value={input}
              onChange={handleInputChange}
              placeholder={"Type your message here..."}
              className="pr-12 placeholder:italic placeholder:text-zinc-600/75 focus-visible:ring-zinc-500 border-2"
            />
            <Button
              size="icon"
              type="submit"
              variant="secondary"
              disabled={isLoading}
              className="absolute right-1 top-1 h-8 w-10"
            >
              <SendHorizontalIcon className="h-5 w-5 text-primary" />
            </Button>
          </form>
        </div>

        {/* Subscription dialog */}
        {/* <SubscriptionDialog
          open={subscriptionDialogOpen}
          onOpenChange={setSubscriptionDialogOpen}
        /> */}
      </div>
    </section>
  );
}
