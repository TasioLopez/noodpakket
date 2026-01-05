import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

// Create a reader instance for accessing Keystatic content
export const reader = createReader(process.cwd(), keystaticConfig);

// Helper function to get singleton data
export async function getSingletonData(singletonName: string) {
  try {
    const singleton = await reader.singletons[singletonName as keyof typeof reader.singletons].read();
    return singleton;
  } catch (error) {
    // If singleton doesn't exist or can't be read, return null
    console.warn(`Could not read singleton ${singletonName}:`, error);
    return null;
  }
}

