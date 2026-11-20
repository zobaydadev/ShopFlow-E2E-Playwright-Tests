import { test, expect } from '@playwright/test';

test.describe('Posts API', () => {
  test('lists 100 posts', async ({ request }) => {
    const res = await request.get('/posts');

    expect(res.status()).toBe(200);
    expect(await res.json()).toHaveLength(100);
  });

  test('returns a single post with the expected shape', async ({ request }) => {
    const res = await request.get('/posts/1');
    const body = await res.json();

    expect(res.ok()).toBeTruthy();
    expect(body).toMatchObject({ id: 1, userId: 1 });
    expect(typeof body.title).toBe('string');
    expect(typeof body.body).toBe('string');
  });

  test('filters posts by user', async ({ request }) => {
    const res = await request.get('/posts', { params: { userId: 3 } });
    const posts: Array<{ userId: number }> = await res.json();

    expect(posts).toHaveLength(10);
    expect(posts.every((p) => p.userId === 3)).toBeTruthy();
  });

  test('lists the comments of a post', async ({ request }) => {
    const res = await request.get('/posts/1/comments');
    const comments: Array<{ postId: number; email: string }> = await res.json();

    expect(res.status()).toBe(200);
    expect(comments.length).toBeGreaterThan(0);
    expect(comments.every((c) => c.postId === 1 && c.email.includes('@'))).toBeTruthy();
  });

  test('creates a post', async ({ request }) => {
    const payload = { title: 'playwright', body: 'created by a test', userId: 1 };
    const res = await request.post('/posts', { data: payload });
    const body = await res.json();

    expect(res.status()).toBe(201);
    expect(body).toMatchObject(payload);
    expect(body.id).toBeGreaterThan(100);
  });

  test('updates a post', async ({ request }) => {
    const res = await request.put('/posts/1', {
      data: { id: 1, title: 'updated', body: 'updated body', userId: 1 },
    });

    expect(res.status()).toBe(200);
    expect((await res.json()).title).toBe('updated');
  });

  test('deletes a post', async ({ request }) => {
    const res = await request.delete('/posts/1');

    expect(res.status()).toBe(200);
  });

  test('missing post returns 404', async ({ request }) => {
    const res = await request.get('/posts/99999');

    expect(res.status()).toBe(404);
  });
});
