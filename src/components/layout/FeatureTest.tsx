import { getAllPublishedTests,} from "@/actions/test";
import TestCard from "../common/TestCard";

const FeatureTest = async () => {
  const tests = await getAllPublishedTests();
  console.log(tests);
  return (
    <section id="tests" className="max-container max-sm:mt-12">
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-bold font-palanquin">
          Our <span className="text-primary">Popular</span> Tests
        </p>
        <p className="lg:max-w-lg text-gray-500">
            Enhance your exam readiness with our curated selection of practice tests. 
          Explore our wide range of subjects and find the perfect tests to challenge your 
          knowledge and sharpen your skills.
        </p>

        <div
          className="grid mt-16 lg:grid-cols-4 md:grid-cols-3
       sm:grid-cols-2 grid-cols-1 gap-14"
        >
          {tests?.map((test) => {
            if ("student" === "student" && !test.published) return;
            return (
              <TestCard
                key={test.id}
                id={test.id}
                userId={test.userId}
                title={test.title}
                instructor={test?.user?.name as string}
                description={test.description as string}
                duration={test.duration}
                startAt={test.startAt}
                  role={'student' as string}
                published={test.published}
                isPurchased={false}
                price={test.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureTest;
