'use client'

import { useEffect, useRef, useState, useTransition } from 'react'

import { createMenfessAction } from '@/actions/menfess'

import { toast } from 'sonner'

import Send from '../atoms/icon/Send'

export default function MenfessForm() {
    const [isPending, startTransition] = useTransition()

    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");
    
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    // auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
        }
    }, [message]);

    async function submitAction(formData: FormData) {
        const result = await createMenfessAction(formData)

        if (!result.success) {
            toast.error(
                result.error ?? result.message
            )
            return
        }

        toast.success(
            'Menfess berhasil dikirim!'
        )

        setFrom('')
        setTo('')
        setMessage('')
    }

    return (
        <form
            action={(formData) =>
                startTransition(async () => {
                await submitAction(formData)
                })
            }
            className="w-full px-6 text-white lg:px-4"
          >
            {/* From & To */}
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4 w-full">
                {/* From */}
                <div className="flex-1 flex flex-col gap-1">
                    <input
                        name="from"
                        type="text"
                        placeholder="From: ..."
                        maxLength={24}
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="h-12 px-4 border border-white bg-[#0B1E38]/70 outline-none text-white placeholder:text-white/50 transition rounded-xl lg:rounded-r-none lg:rounded-l-xl focus:border-white"
                    />
                      <span className="text-xs text-white/60 text-right">
                        {from.length}/24
                      </span>
                </div>

                {/* To */}
                <div className="flex-1 flex flex-col gap-1">
                    <input
                        name="to"
                        type="text"
                        placeholder="To: ..."
                        maxLength={24}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="h-12 px-4 border border-white bg-[#0B1E38]/70 outline-none text-white placeholder:text-white/50 transition rounded-xl lg:rounded-l-none lg:rounded-r-xl focus:border-white"
                    />
                      <span className="text-xs text-white/60 text-right">
                        {to.length}/24
                      </span>
                </div>
            </div>

            {/* Message & Send */}
            <div className="flex flex-col lg:flex-row gap-3 w-full items-stretch">
                {/* Message */}
                <div className="flex-1 flex flex-col gap-1">
                    <textarea
                        ref={textareaRef}
                        name="message"
                        placeholder="Type your message here..."
                        maxLength={240}
                        rows={1}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="min-h-[60px] max-h-[300px] resize-none overflow-hidden border border-white bg-[#0B1E38]/70 px-4 py-4 outline-none text-white placeholder:text-white/50 
                                  transition rounded-xl lg:rounded-r-none lg:rounded-l-xl focus:border-white"
                    />
                      <span className="text-xs text-white/60 text-right">
                        {message.length}/240
                      </span>
                </div>

                {/* Send Button */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="h-[60px] lg:h-auto lg:self-stretch w-full lg:w-[120px] border border-white bg-[#0B1E38]/70 flex items-center justify-center gap-2 text-white 
                              transition transform hover:scale-[1.02] hover:bg-[#132B66]/70 rounded-xl lg:rounded-l-none lg:rounded-r-xl cursor-pointer"
                >
                  <span>
                    <Send width={20} height={20} />
                  </span>
                  
                  {isPending ? 'Sending...' : 'Send'}
                </button>
            </div>
        </form>
    )
}