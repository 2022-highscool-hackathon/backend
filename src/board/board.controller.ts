import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { BoardService } from './board.service';
import { UploadBoardDTO } from './dto/request/upload-board.dto';
import { ViewBoardInfoDTO } from './dto/request/view-board-info.dto';

@Controller('board')
export class BoardController {
    constructor(private readonly boardservice: BoardService) {}
    
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    async uploadBoard(@Body() dto: UploadBoardDTO) {
        // 반환 안하므로 await을 붙여줘야 예외처리가 됨
        await this.boardservice.UploadBoard(dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async viewBoard() {
        return this.boardservice.ViewBoard();
    }

    @Get(':boardcode')
    @UseGuards(JwtAuthGuard)
    async viewBoardInfo(@Param() dto: ViewBoardInfoDTO) {
        return this.boardservice.ViewBoardInfo(dto);
    }
}
