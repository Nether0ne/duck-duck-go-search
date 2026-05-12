import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import z from 'zod';
import { firstValueFrom } from 'rxjs';
import { randomUUID } from 'crypto';

const duckDuckGoTopicSchema = z.object({
  Text: z.string().optional(),
  FirstURL: z.string().optional(),
});
type DuckDuckGoTopic = z.infer<typeof duckDuckGoTopicSchema>;

const duckDuckGoExtendedTopicSchema: z.ZodType<
  DuckDuckGoTopic & {
    Topics?: DuckDuckGoTopic[];
  }
> = z.lazy(() =>
  z.object({
    Text: z.string().optional(),
    FirstURL: z.string().optional(),
    Topics: z.array(duckDuckGoTopicSchema).optional(),
  }),
);
type DuckDuckGoExtendedTopic = z.infer<typeof duckDuckGoExtendedTopicSchema>;

const duckDuckGoResponseSchema: z.ZodType<{
  RelatedTopics: DuckDuckGoExtendedTopic[];
}> = z.lazy(() =>
  z.object({
    RelatedTopics: z.array(duckDuckGoExtendedTopicSchema),
  }),
);
type DuckDuckGoResponse = z.infer<typeof duckDuckGoResponseSchema>;

const searchResponseSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.string(),
});
type SearchResponse = z.infer<typeof searchResponseSchema>;

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  private readonly DUCK_DUCK_GO_API_URL = 'https://api.duckduckgo.com/';

  constructor(private readonly httpService: HttpService) {}

  async searchDuckDuckGo(query: string, page: number = 1, limit: number = 10) {
    let topics: DuckDuckGoResponse['RelatedTopics'] = [];
    try {
      const url = `${this.DUCK_DUCK_GO_API_URL}?q=${encodeURIComponent(query)}&format=json`;
      const response = await firstValueFrom(
        this.httpService.get<DuckDuckGoResponse>(url),
      );
      const data = duckDuckGoResponseSchema.parse(response.data);
      topics = data.RelatedTopics;
    } catch (error) {
      this.logger.error(
        `Could not fetch DuckDuckGo with the following query: ${query}`,
        error instanceof Error ? error.stack : error,
      );
      throw new InternalServerErrorException(
        'Failed to fetch data from DuckDuckGo',
      );
    }

    const searchResults: SearchResponse[] = [];
    topics.forEach((topic) => {
      const topics = topic.Topics;
      const title = topic.Text;
      const url = topic.FirstURL;

      if (!topics && !title && !url) return;
      if (title && url) {
        searchResults.push(this.formatSearchResult(title, url));
      }

      topics?.map((topic) => {
        const title = topic.Text;
        const url = topic.FirstURL;
        if (!title || !url) return null;
        searchResults.push(this.formatSearchResult(title, url));
      });
    });

    const startIndex = (page - 1) * limit;
    const paginatedResults = searchResults.slice(
      startIndex,
      startIndex + limit,
    );

    return {
      results: paginatedResults,
      total: searchResults.length,
      page,
      limit,
    };
  }

  private formatSearchResult(title: string, url: string): SearchResponse {
    return {
      id: randomUUID(),
      title,
      url,
    };
  }
}
