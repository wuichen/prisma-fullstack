import { InputGroup, Checkbox, Button } from 'oah-ui';
import { Card, CardBody, CardHeader, CardFooter } from 'oah-ui';
import React, { useContext, useState } from 'react';
import { useFindManyWebsiteQuery } from 'generated';
import { LayoutContext } from 'layouts/Admin';
import Link from 'next/link';
import { Container, Row, Col } from 'oah-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import decodeAccessToken from 'helper/decodeAccessToken';
const Sites = () => {
  // const { toggleAdd } = useContext(AddContext);
  const { me } = useContext(LayoutContext);
  const router = useRouter();
  const [where, setWhere] = useState(null);

  useEffect(() => {
    const decode = decodeAccessToken();
    if (decode.permissions) {
      if (decode.permissions.platformId) {
        setWhere({
          platform: {
            id: {
              equals: decode.permissions.platformId,
            },
          },
        });
      } else if (decode.permissions.companyId) {
        setWhere({
          company: {
            id: {
              equals: decode.permissions.companyId,
            },
          },
        });
      }
    }
  }, []);

  const { data: websitesData, loading, error } = useFindManyWebsiteQuery({
    variables: {
      where,
    },
    skip: !where,
  });

  return (
    <Container>
      <h2>My Websites</h2>
      <Link href="/admin/dashboard/sites/new/planner">
        <Button>Create</Button>
      </Link>
      <Row>
        {websitesData?.findManyWebsite?.map((website) => {
          return (
            <Col breakPoint={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Card>
                <CardHeader>{website.name}</CardHeader>
                <CardBody>{website.description}</CardBody>
                <CardFooter>
                  <Button>Enter</Button>
                </CardFooter>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Sites;
