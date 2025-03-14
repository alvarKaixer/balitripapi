import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../modules/ahp/domain/entities/location.entity';

@Injectable()
export class LocationSeeder implements Seeder {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async seed(): Promise<any> {
    const touristLocations = [
      { name: 'Hardrock lux spring resort' },
      { name: 'Mang inasal' },
      { name: 'St ritas parish church' },
      { name: 'The spot' },
      { name: 'Balingasag park' },
      { name: 'Bebedeck' },
      { name: 'Emmanuel spring' },
      { name: 'Escanilla' },
      { name: 'Ip village' },
      { name: 'Isla verde' },
      { name: 'Joannas nook' },
      { name: 'La rocka' },
      { name: 'Linabu mountain view' },
      { name: 'Pidoy Beach Resort' },
      { name: 'Jollibee' },
      { name: 'The Edge Garden Bar' },
      { name: 'The Edge EG Sweets' },
      { name: 'The Edge Wing Zone' },
      { name: 'The Edge Khaleesis' },
      { name: 'The Edge Maamo Refreshments' },
      { name: 'RRG Food Corner' },
      { name: 'Crispy King' },
      { name: 'Juanas Place' },
      { name: 'The Spot Secret place of Toring' },
      { name: 'The Spot House of Boodle' },
      { name: 'TCafe' },
      { name: 'K, OK Grill' },
      { name: 'Madelines' },
      { name: 'Juanas Pantalan' },
    ];

    // Function to generate a random score between min and max
    function getRandomScore(min: number, max: number): number {
      return parseFloat((Math.random() * (max - min) + min).toFixed(1));
    }

    // Assign random scores to each feature of each location
    const locationsWithScores = touristLocations.map((location) => ({
      ...location,
      cost: getRandomScore(1, 10),
      facilities: getRandomScore(1, 10),
      touristActivities: getRandomScore(1, 10),
      accessibility: getRandomScore(1, 10),
    }));

    const locationsEntities = locationsWithScores.map((location) =>
      this.locationRepository.create(location),
    );

    await this.locationRepository.save(locationsEntities);
    return locationsEntities;
  }

  async drop(): Promise<any> {
    await this.locationRepository.clear();
  }
}
