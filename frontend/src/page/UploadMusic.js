// 음원 업로드 모달
// 향후 DaisyUI 이용해서 모달로 구현 필요
// 제목, 앨범 표지, 가사, 해시태그, 상세 정보
// 향후 해시태그 및 파일 첨부, 버튼 누르면 다른 페이지로 이동 구현 필요


export default function UploadMusic() {
	return (
		<div className="w-full h-full">
			<div className="flex flex-col w-full items-center justify-center">
				<div className="text-base-content pt-5 pb-50 w-full">
					<div className="text-4xl pb-10">음원 등록하기</div>
					<div className="flex items-center pb-10 mx-6">
						<div className="text-left whitespace-nowrap pr-10">제목</div>
						<input type="text" placeholder="제목을 입력해주세요." className="input input-ghost w-full px-3"/>
					</div>
					
					<div className="flex pb-10 justify-between mx-6">
						{/* 파일 첨부 구현 필요*/}
						<div className="text-left whitespace-nowrap pr-10">앨범표지</div>
						<div className="btn btn-primary btn-xs">첨부하기</div>
					</div>

					<div className="flex pb-10 justify-between mx-6">
						{/* 파일 첨부 구현 필요*/}
						<div className="text-left whitespace-nowrap pr-10">가사</div>
						<div className="btn btn-primary btn-xs">첨부하기</div>
					</div>

					<div className="flex pb-10 justify-between mx-6">
						<div className="text-left whitespace-nowrap pr-10">해시태그</div>
						<div className="btn btn-primary btn-xs">+ 추가하기</div>
					</div>

					<div className="flex pb-10 mx-6">
						<div className="text-left whitespace-nowrap pr-7">상세 내용</div>
						<textarea className="textarea textarea-bordered w-full" rows={8} placeholder="Bio"></textarea>
					</div>
					
					<div className="flex justify-center">
						<div className="self-auto text-xl flex">                          
							<div className="modal-action px-3">
								<form method="dialog">
									<button className="btn">작성하기</button>
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