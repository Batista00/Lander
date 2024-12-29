import { describe, it, expect, vi, beforeEach } from 'vitest';
import { landingPageService } from '../landingPageService';
import { db } from '@/firebase/config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { LandingPage } from '@/types/landing';

// Mock Firebase
vi.mock('@/firebase/config', () => ({
  db: {
    collection: vi.fn(),
    doc: vi.fn(),
    getDoc: vi.fn(),
    getDocs: vi.fn(),
    addDoc: vi.fn(),
    updateDoc: vi.fn(),
    deleteDoc: vi.fn(),
    query: vi.fn(),
    where: vi.fn(),
    serverTimestamp: vi.fn()
  }
}));

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  serverTimestamp: vi.fn(() => new Date())
}));

describe('LandingPageService', () => {
  const mockUserId = 'test-user-id';
  const mockLandingPage: Partial<LandingPage> = {
    name: 'Test Landing Page',
    description: 'Test Description',
    components: [],
    status: 'draft',
    userId: mockUserId
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserPages', () => {
    it('should fetch user pages successfully', async () => {
      const mockDocs = [
        {
          id: 'page1',
          data: () => ({
            ...mockLandingPage,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        }
      ];

      vi.mocked(query).mockReturnValue({} as any);
      vi.mocked(getDocs).mockResolvedValue({ docs: mockDocs } as any);

      const pages = await landingPageService.getUserPages(mockUserId);

      expect(pages).toHaveLength(1);
      expect(pages[0].id).toBe('page1');
      expect(pages[0].name).toBe(mockLandingPage.name);
    });

    it('should handle errors when fetching pages', async () => {
      vi.mocked(query).mockReturnValue({} as any);
      vi.mocked(getDocs).mockRejectedValue(new Error('Fetch error'));

      await expect(landingPageService.getUserPages(mockUserId)).rejects.toThrow('Error getting user pages');
    });
  });

  describe('createPage', () => {
    it('should create a page successfully', async () => {
      const mockDocRef = { id: 'new-page-id' };
      vi.mocked(addDoc).mockResolvedValue(mockDocRef as any);

      const pageId = await landingPageService.createPage(mockLandingPage, mockUserId);

      expect(pageId).toBe('new-page-id');
      expect(addDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          ...mockLandingPage,
          userId: mockUserId,
          status: 'draft'
        })
      );
    });

    it('should handle errors when creating a page', async () => {
      vi.mocked(addDoc).mockRejectedValue(new Error('Creation error'));

      await expect(landingPageService.createPage(mockLandingPage, mockUserId)).rejects.toThrow('Error creating page');
    });
  });

  describe('updatePage', () => {
    it('should update a page successfully', async () => {
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      await expect(landingPageService.updatePage('page-id', { name: 'Updated Name' })).resolves.not.toThrow();

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: 'Updated Name',
          updatedAt: expect.anything()
        })
      );
    });

    it('should handle errors when updating a page', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Update error'));

      await expect(landingPageService.updatePage('page-id', { name: 'Updated Name' })).rejects.toThrow('Error updating page');
    });
  });

  describe('deletePage', () => {
    it('should delete a page successfully', async () => {
      vi.mocked(deleteDoc).mockResolvedValue(undefined);

      await expect(landingPageService.deletePage('page-id')).resolves.not.toThrow();

      expect(deleteDoc).toHaveBeenCalled();
    });

    it('should handle errors when deleting a page', async () => {
      vi.mocked(deleteDoc).mockRejectedValue(new Error('Delete error'));

      await expect(landingPageService.deletePage('page-id')).rejects.toThrow('Error deleting page');
    });
  });

  describe('getPageById', () => {
    it('should fetch a page by id successfully', async () => {
      const mockDoc = {
        id: 'page-id',
        exists: () => true,
        data: () => ({
          ...mockLandingPage,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      };

      vi.mocked(getDoc).mockResolvedValue(mockDoc as any);

      const page = await landingPageService.getPageById('page-id');

      expect(page.id).toBe('page-id');
      expect(page.name).toBe(mockLandingPage.name);
    });

    it('should throw error when page not found', async () => {
      const mockDoc = {
        exists: () => false
      };

      vi.mocked(getDoc).mockResolvedValue(mockDoc as any);

      await expect(landingPageService.getPageById('non-existent-id')).rejects.toThrow('Page not found');
    });
  });

  describe('publishPage', () => {
    it('should publish a page successfully', async () => {
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      await expect(landingPageService.publishPage('page-id')).resolves.not.toThrow();

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'published',
          publishedAt: expect.anything(),
          updatedAt: expect.anything()
        })
      );
    });

    it('should handle errors when publishing a page', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Publish error'));

      await expect(landingPageService.publishPage('page-id')).rejects.toThrow('Error publishing page');
    });
  });

  describe('unpublishPage', () => {
    it('should unpublish a page successfully', async () => {
      vi.mocked(updateDoc).mockResolvedValue(undefined);

      await expect(landingPageService.unpublishPage('page-id')).resolves.not.toThrow();

      expect(updateDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          status: 'draft',
          updatedAt: expect.anything()
        })
      );
    });

    it('should handle errors when unpublishing a page', async () => {
      vi.mocked(updateDoc).mockRejectedValue(new Error('Unpublish error'));

      await expect(landingPageService.unpublishPage('page-id')).rejects.toThrow('Error unpublishing page');
    });
  });
});
