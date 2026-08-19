import mongoose from 'mongoose';
import { connectionString } from '../config/database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}), Leaderboard.deleteMany({}), Workout.deleteMany({})]);

    const [alex, sam] = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Runner' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Trainer' },
    ]);

    await Team.create({
      name: 'OctoFitters',
      description: 'Community team for the first challenge.',
      members: [alex._id, sam._id],
    });

    await Activity.create([
      { user: alex._id, type: 'Running', durationMinutes: 30, points: 300 },
      { user: sam._id, type: 'Cycling', durationMinutes: 45, points: 450 },
    ]);

    await Leaderboard.create([
      { user: alex._id, points: 300, rank: 2 },
      { user: sam._id, points: 450, rank: 1 },
    ]);

    await Workout.create([
      { name: 'Morning Momentum', level: 'Beginner', category: 'Cardio', durationMinutes: 20 },
      { name: 'Core Builder', level: 'Intermediate', category: 'Strength', durationMinutes: 30 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
