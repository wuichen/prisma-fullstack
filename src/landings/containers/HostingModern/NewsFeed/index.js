import React from 'react';
import Link from 'next/link';
import { Icon } from 'react-icons-kit';
import { angleRight } from 'react-icons-kit/fa/angleRight';
import Container from 'landings/common/src/components/UI/Container';
import BlogPost from 'landings/common/src/components/BlogPost';
import SectionHeading from '../SectionHeading';
import SectionWrapper, { ContentWrapper } from './newsFeed.style';
import { newsFeed } from 'landings/common/src/data/HostingModern';

const NewsFeed = () => {
  return (
    <SectionWrapper id="news">
      <Container>
        <SectionHeading slogan="Latest newsfeed" title="Our recent blog post that updated" />
        <ContentWrapper>
          {newsFeed.map((news) => (
            <BlogPost
              key={news.id}
              thumbUrl={news.image}
              title={news.title}
              excerpt={news.excerpt}
              link={
                <Link href={news.link}>
                  <a className="excerptLink">
                    Learn More <Icon icon={angleRight} />
                  </a>
                </Link>
              }
            />
          ))}
        </ContentWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default NewsFeed;
