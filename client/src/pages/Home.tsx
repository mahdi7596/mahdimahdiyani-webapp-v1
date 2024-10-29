import Card from "../components/shared/Card";

const Home = () => {
  return (
    <>
      <div className="my-24 flex flex-col justify-center items-center">
        <Card
          title="معرفی بهترین تقویت کننده‌های مژه"
          featured="جدید"
          cardClassName="w-96"
          excerpt="این مواد مغذی همگی به تقویت مو و مژه‌ها کمک می‌کنند. برخلاف ریمل‌ها، نتایج مثبت احتمالی بهترین تقویت کننده مژه پس از مدتی خود را نشان می‌دهد. بنابراین، باید سرم یا محصول مراقبتی را انتخاب کنید که سهولت استفاده، جذب بالا، عدم حساسیت و قابلیت تقویت و افزایش طول مژه‌ها را داشته باشد. برای اینکه انتخاب بهتری داشته باشید، به خواندن این مقاله ادامه دهید. در ادامه، بهترین محصولات تقویت کننده مژه را معرفی می‌کنیم."
          tags={[
            { text: "زیبایی", link: "#" },
            { text: "مقاله", link: "#" },
            { text: "محصول", link: "#" },
          ]}
          actionButton={{
            text: "مشاهده بیشتر",
            className: "btn-primary self-end",
          }}
        />
      </div>
    </>
  );
};

export default Home;
