import React from 'react';
import { useRouter } from 'next/router';
import { PrismaTable } from './PrismaTable';
import { Container, Row, Col } from 'oah-ui';

const Table: React.FC<{ model: string }> = ({ model }) => {
  const router = useRouter();
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>{model}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div style={{ marginBottom: '40px' }}>
              this is the description of this resource. use this place to
              explain what should be done in this page. good!
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <PrismaTable
              model={model}
              push={router.push}
              query={router.query}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
  // return (
  //   <>
  //     <Container>
  //       <Row>
  //         <Col breakPoint={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
  //           <h1>{model}</h1>
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col breakPoint={{ xs: 12, sm: 3, md: 3, lg: 3 }}>
  //           <div>
  //             this is the description of this resource. use this place to
  //             explain what should be done in this page. good!
  //           </div>
  //         </Col>
  //         <Col breakPoint={{ xs: 12, sm: 9, md: 9, lg: 9 }}>
  //           <PrismaTable
  //             model={model}
  //             push={router.push}
  //             query={router.query}
  //           />
  //         </Col>
  //       </Row>
  //     </Container>
  //   </>
  // );
};

export default Table;
