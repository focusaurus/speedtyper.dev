import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ResultCalculationService } from './services/result-calculation.service';
import { ResultFactoryService } from './services/result-factory.service';
import { ResultService } from './services/results.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result])],
  providers: [ResultService, ResultFactoryService, ResultCalculationService],
  exports: [ResultService, ResultFactoryService],
})
export class ResultsModule {}
