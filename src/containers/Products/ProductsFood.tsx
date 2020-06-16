import React, { useState } from 'react';
import { useRouter } from 'next/router';
import gql from 'graphql-tag';
import ProductCard from 'components/ProductCard/ProductCardFood';
import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from './Products.style';
import { useQuery } from '@apollo/react-hooks';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Placeholder from 'components/Placeholder/Placeholder';
import Fade from 'react-reveal/Fade';
import NoResultFound from 'components/NoResult/NoResult';

import { customerDistance } from 'helper/customerDistance';
import { formatTime } from 'helper/formatTime';

const GET_VENDORS = gql`
  query getVendors(
    $type: String
    $text: String
    $category: String
    $offset: Int
    $limit: Int
  ) {
    vendors(
      type: $type
      text: $text
      category: $category
      offset: $offset
      limit: $limit
    ) {
      items {
        id
        slug
        type
        categories
        name
        thumbnailUrl
        description
        promotion
        deliveryDetails {
          charge
          minimumOrder
          isFree
        }
        # discountInPercent
        # type
        # image
        # gallery {
        #   url
        # }
        # categories {
        #   id
        #   title
        #   slug
        # }
      }
      totalCount
      hasMore
    }
  }
`;

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
export const Products: React.FC<ProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 8,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const { data, error, loading, fetchMore } = useQuery(GET_VENDORS, {
    variables: {
      // type: type,
      text: router.query.text,
      category: router.query.category,
      offset: 0,
      limit: fetchLimit,
    },
  });

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (error) return <div>{error.message}</div>;
  if (!data || !data.vendors || data.vendors.items.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = () => {
    toggleLoading(true);
    fetchMore({
      variables: {
        offset: Number(data.vendors.items.length),
        limit: fetchLimit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          vendors: {
            __typename: prev.vendors.__typename,
            items: [...prev.vendors.items, ...fetchMoreResult.vendors.items],
            totalCount: fetchMoreResult.vendors.totalCount,
            hasMore: fetchMoreResult.vendors.hasMore,
          },
        };
      },
    });
  };

  return (
    <>
      <ProductsRow>
        {data?.vendors?.items.map((item: any, index: number) => (
          <ProductsCol key={index} className="food-col">
            <ProductCardWrapper>
              <Fade
                duration={800}
                delay={index * 10}
                style={{ height: '100%' }}
              >
                <ProductCard
                  name={item.name}
                  image={item.thumbnailUrl}
                  restaurantType={item?.categories.join(', ')}
                  duration={formatTime(customerDistance())}
                  delivery={item.deliveryDetails.charge}
                  isFree={item.deliveryDetails.isFree}
                  discountInPercent={item.promotion}
                  data={item}
                  onClick={() =>
                    router.push(
                      '/restaurant/[slug]',
                      `/restaurant/${item.slug}`
                    )
                  }
                />
              </Fade>
            </ProductCardWrapper>
          </ProductsCol>
        ))}
      </ProductsRow>
      {loadMore && data.vendors.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            title="Load More"
            intlButtonId="loadMoreBtn"
            size="small"
            isLoading={loadingMore}
            loader={<Loader color="#009E7F" />}
            style={{
              minWidth: 135,
              backgroundColor: '#ffffff',
              border: '1px solid #f1f1f1',
              color: '#009E7F',
            }}
          />
        </ButtonWrapper>
      )}
    </>
  );
};
export default Products;
