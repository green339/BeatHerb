// 상대방이 보는 chat

export default function ChatYou(){
    return(
        <div>
            <p  className="font-semibold text-cyan-950" style={{textAlign: 'right'}}>2024-01-06 16:33:11</p>
            <div className="float-right bg-slate-900" style={{width: '450px', height: '50px',borderRadius: '10px 10px 0px 10px'}}>
                <p className="font-bold pr-6 pt-1 mt-2 text-slate-50" style={{textAlign: 'right'}}>채팅이 들어올 예정</p>
            </div>
        </div>
    );
}