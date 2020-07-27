import { Post } from "retro-board-common";

  
export async function createTicket(post:Post): Promise<String> {
    const response = await fetch(`/api/jira/ticket`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ title: post.action }),
    });
    if (response.ok) {
      const json = await response.json();
      return json.jira
    }
    throw new Error('Could not create a ticket');
  }