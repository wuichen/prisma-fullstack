import React from 'react';

import Container from 'landings/common/src/components/UI/Container';
import Text from 'landings/common/src/components/Text';
import Heading from 'landings/common/src/components/Heading';
import BlogPost from 'landings/common/src/components/BlogPost';
import Image from 'landings/common/src/components/Image';

import SectionWrapper, { SectionHeading, NewsWrapper } from './news.style';

import data from 'landings/common/src/data/AgencyModern';
import comment from 'landings/common/src/assets/image/agencyModern/comment.png';

const News = () => {
  return (
    <SectionWrapper id="news">
      <Container>
        <SectionHeading>
          <Heading as="h2" content="Popular blog post we update everyday" />
          <Text content="Focus only on the meaning, we take care of the design. As soon as the meeting end you can export in one click." />
        </SectionHeading>
        <NewsWrapper>
          {data.posts.map((post) => (
            <BlogPost
              key={`news-${post.id}`}
              thumbUrl={post.icon}
              title={post.title}
              link={
                <React.Fragment>
                  <Image src={comment} alt="comment" /> {post.comments_count} comments
                </React.Fragment>
              }
            />
          ))}
        </NewsWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default News;
