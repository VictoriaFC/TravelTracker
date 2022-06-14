import { expect } from 'chai';
import TravelerRepository from '../src/TravelerRepository';
import Traveler from '../src/Traveler';
import  travelerData  from '../src/data/sampleData-traveler';

describe('Traveler Repository', () => {
	let travelerRepo;
  beforeEach(() => {
    travelerRepo = new TravelerRepository(travelerData);
  });

  it('should be a function', function () {
    expect(TravelerRepository).to.be.a('function');
  });
	
	it('should have travelers', function () {
		expect(travelerRepo.travelers[0]).is.instanceOf(Traveler);
	});	 
});