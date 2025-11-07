import Col from "~/shared/ui/Col/Col";
import Row from "~/shared/ui/Row/Row";

interface StarwarsCardSkeletonProps {
  length?: number;
}

const StarwarsCardSkeleton = ({ length = 8 }: StarwarsCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length })
        .fill(1)
        .map((_, idx) => (
          <div
            key={idx}
            aria-hidden="true"
            className="animate-pulse h-[250px] relative outline-none"
          >
            <article className="p-6 border-2 border-gray-70 h-full rounded-[21px] bg-gray-80 transition-colors duration-300">
              <Row spacing={7} alignItems="flex-start">
                <Col className="shrink-0 flex-1 gap-[18px]!">
                  <Col spacing={1}>
                    <span className="w-25 h-4 bg-gray-70 rounded-sm"></span>
                    <span className="w-25 h-4 bg-gray-90 rounded-sm"></span>
                  </Col>
                  <Col spacing={1}>
                    <span className="w-25 h-4 bg-gray-70 rounded-sm"></span>
                    <span className="w-25 h-4 bg-gray-90 rounded-sm"></span>
                  </Col>
                  <Col spacing={1}>
                    <span className="w-25 h-4 bg-gray-70 rounded-sm"></span>
                    <span className="w-25 h-4 bg-gray-90 rounded-sm"></span>
                  </Col>
                  <Col spacing={1}>
                    <span className="w-25 h-4 bg-gray-70 rounded-sm"></span>
                    <span className="w-25 h-4 bg-gray-90 rounded-sm"></span>
                  </Col>
                </Col>
              </Row>
            </article>
          </div>
        ))}
    </>
  );
};

export default StarwarsCardSkeleton;
