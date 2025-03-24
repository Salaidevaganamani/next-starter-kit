import db from '@/modules/db';
import { faker } from '@faker-js/faker';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } });

  const generatePosts = async () => {
    'use server';

    await db.post.createMany({
      data: [
        { content: faker.lorem.sentence() },
        { content: faker.lorem.sentence() },
        { content: faker.lorem.sentence() },
      ],
    });
    revalidatePath('/');
  };

  return (
    <main className="flex flex-col min-h-screen p-24">
      <button onClick={generatePosts}>Generate Posts</button>
      {posts.map((post) => (
        <div key={post.id}>{post.content}</div>
      ))}
    </main>
  );
}
