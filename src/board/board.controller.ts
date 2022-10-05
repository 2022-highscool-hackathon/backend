import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { BoardService } from './board.service';
import { UploadBoardDto } from './dto/request/upload-board.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardservice: BoardService) {}
    
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    async uploadBoard(@Body() dto: UploadBoardDto) {
        // 반환 안하므로 await을 붙여줘야 예외처리가 됨
        await this.boardservice.UploadBoard(dto);
    }
}
