import { Request } from 'express';
import { User } from 'retro-board-common';
import { Store } from './types';
import fetch from 'node-fetch';
import config from './db/config';
import bodyParser from 'body-parser';

export async function createTicket(req:Request): Promise<string | null> {
  console.log(req.body)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const host = config.JIRA_SERVER
  const url =  `${host}/rest/api/2/issue/`;
  const project = config.JIRA_PROJECT_KEY
  const epicLink = config.JIRA_EPIC_LINK
  const key = config.JIRA_KEY
  const body = JSON.stringify(
    {
      "fields": {
         "project":
         {
            "key": project
         },
         "summary": req.body.title,
         "description": req.body.title,
         "issuetype": {
            "name": "Story"
         },
         "customfield_10001": epicLink
     }
  }
  )
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${key}`
  };
  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    redirect: 'follow',
    body: body,
  });
  if (response.ok) {
    const data = await response.json();
    return JSON.stringify({ "jira": data.key })
  }
  throw new Error('Could not create a jira ticket');
}
