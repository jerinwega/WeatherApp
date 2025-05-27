import AsyncStorage from '@react-native-async-storage/async-storage';
import { storeData, getData } from '../asyncStorage';

// Auto-mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('asyncStorage utility', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('storeData', () => {
    it('should store data successfully', async () => {
      AsyncStorage.setItem.mockResolvedValueOnce();

      await storeData('key1', 'value1');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith('key1', 'value1');
    });

    it('should log an error if storing fails', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      AsyncStorage.setItem.mockRejectedValueOnce(new Error('Storage failed'));

      await storeData('key2', 'value2');

      expect(consoleSpy).toHaveBeenCalledWith('Error storing value: ', 'value2');

      consoleSpy.mockRestore();
    });
  });

  describe('getData', () => {
    it('should retrieve stored data', async () => {
      AsyncStorage.getItem.mockResolvedValueOnce('storedValue');

      const result = await getData('key1');

      expect(AsyncStorage.getItem).toHaveBeenCalledWith('key1');
      expect(result).toBe('storedValue');
    });

    it('should log an error if retrieval fails', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      AsyncStorage.getItem.mockRejectedValueOnce(new Error('Retrieve failed'));

      const result = await getData('key3');

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalled(); // it won't log `value`, it's undefined
      consoleSpy.mockRestore();
    });
  });
});
