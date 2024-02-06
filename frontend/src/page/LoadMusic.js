// 음원 로드 모달
// 파일로 불러오기, BeatHerb에서 가져오기
// 향후 BeatHerb에서 가져오는 기능 및  
// 음원 불러오기 버튼 입력 시 브라우저에 저장 기능 구현 필요


export default function LoadMusic() {

    return (
        <div className="w-full h-full">
            <div className="flex flex-col w-full items-center justify-center">
                <div className="text-base-content pt-5 pb-50 w-full">
                    <div className="text-4xl pb-10">음원 불러오기</div>       
                    <div className="flex pb-10 justify-between mx-6">
                        {/* 파일 첨부 구현 필요*/}
                        <div className="text-left whitespace-nowrap pr-10">파일로 첨부하기</div>
                        <div className="btn btn-primary btn-xs">첨부하기</div>
                    </div>
                    
                    <div className="text-left whitespace-nowrap pb-2 pr-10 mx-6">BeatHerb에서 가져오기</div>

                    <div className="flex pb-2 mx-6">
                        <div className="btn btn-primary btn-xs mr-1">멜로디</div>
                        <div className="btn btn-primary btn-xs mr-1">보컬</div>
                        <div className="btn btn-primary btn-xs mr-1">음원</div>
                    </div>

                    <input type="text" placeholder="@을 누르고 음원 제목을 입력해주세요." className="input input-ghost w-full mx-3"/>

                    
                    <div className="flex justify-center">
                        <div className="self-auto text-xl flex">                          
                            <div className="modal-action px-3">
                                <form method="dialog">
                                    <button className="btn">불러오기</button>
                                </form>
                            </div>
                            <div className="modal-action px-3">
                                <form method="dialog">
                                    <button className="btn">취소하기</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>     
            </div>
        </div>   
    );
}