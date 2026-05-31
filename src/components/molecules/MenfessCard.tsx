import SendBlack from '../atoms/icon/SendBlack'
import Mail from '../atoms/icon/Mail'
import CalendarClock from '../atoms/icon/CalendarClock'

export interface MenfessCardProps {
  id: number | string
  from: string
  to: string
  message: string
  timestamp: string
  reactions: {
    laugh: number
    love: number
    sad: number
    angry: number
  }
}

const MenfessCard = ({ from, to, message, timestamp, reactions }: MenfessCardProps) => {
  return (
    <div className="bg-[#0B1E38]/75 border border-white rounded-xl p-5 flex flex-col h-[400px] text-white">
      
      {/* Header: From & To */}
      <div className="flex justify-between items-start pb-4 border-b border-white/50 gap-4">
        
        {/* From */}
        <div className="flex items-center gap-3 w-1/2">
          <div className="bg-white rounded-full p-2 text-[#0B1E38] flex-shrink-0 flex items-center justify-center w-8 h-8">
            <span>
                <SendBlack width={20} height={20} />
            </span>
          </div>
          <div className="flex flex-col overflow-hidden w-full">
            <span className="text-[10px] text-white font-semibold">From</span>
            <span className="font-bold text-sm truncate" title={from}>{from}</span>
          </div>
        </div>

        {/* To */}
        <div className="flex items-center gap-3 w-1/2">
          <div className="bg-white rounded-full p-2 text-[#0B1E38] flex-shrink-0 flex items-center justify-center w-8 h-8">
            <span>
                <Mail width={20} height={20} />
            </span>
          </div>
          <div className="flex flex-col overflow-hidden w-full">
            <span className="text-[10px] text-white font-semibold">To</span>
            <span className="font-bold text-sm truncate" title={to}>{to}</span>
          </div>
        </div>
      </div>

      {/* Body: Pesan */}
      <div className="mt-4 flex-grow overflow-hidden">
        <p className="text-sm leading-relaxed text-white line-clamp-8">
          {message}
        </p>
      </div>

      {/* Footer: Reactions & Waktu */}
      <div className="mt-4 flex flex-col gap-3 flex-shrink-0 sm:mt-4 sm:flex-row sm:justify-between sm:items-end">
        
        {/* Reactions (Menggunakan emoji standar untuk mempermudah, bisa diganti icon SVG) */}
        <div className="flex gap-2 w-full justify-center sm:w-auto sm:justify-start">
          <button className="flex items-center gap-1.5 border border-white/30 rounded-md px-3 py-1 text-md hover:bg-white/10 transition cursor-pointer">
            😆 <span>{reactions.laugh}</span>
          </button>
          <button className="flex items-center gap-1.5 border border-white/30 rounded-md px-3 py-1 text-md hover:bg-white/10 transition cursor-pointer">
            😍 <span>{reactions.love}</span>
          </button>
          <button className="flex items-center gap-1.5 border border-white/30 rounded-md px-3 py-1 text-md hover:bg-white/10 transition cursor-pointer">
            😢 <span>{reactions.sad}</span>
          </button>
          <button className="flex items-center gap-1.5 border border-white/30 rounded-md px-3 py-1 text-md hover:bg-white/10 transition cursor-pointer">
            😡 <span>{reactions.angry}</span>
          </button>
        </div>

        {/* Timestamp */}
        <div className="flex items-center gap-1.5 text-[11px] text-white self-end sm:self-auto">
            <span>
                <CalendarClock width={20} height={20} />
            </span>
          <span>{timestamp}</span>
        </div>
      </div>

    </div>
  )
}

export default MenfessCard