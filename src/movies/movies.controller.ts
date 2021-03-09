import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entites/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies') //entry point
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  // search가 id 보다 앞에 있어야 알수있다.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return 'We are searching for a movie made after:' + searchingYear;
  }

  @Get(':id')
  getOne(@Param('id') movieId: number) {
    console.log(typeof movieId);
    return this.movieService.getOne(movieId);
  }
  @Post()
  createMovie(@Body() movieData: CreateMovieDto) {
    console.log('movieData=', movieData);
    return this.movieService.create(movieData);
  }
  @Delete(':id')
  removeMovie(@Param('id') movieId: number) {
    console.log(typeof movieId);
    return this.movieService.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    // return 'This will patch movie with id:' + movieId;
    // return {
    //   updateMovie: movieId,
    //   ...updateData,
    // };
    console.log(typeof movieId);
    return this.movieService.update(movieId, updateData);
  }
}
