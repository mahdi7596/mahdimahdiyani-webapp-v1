import Banner from "../components/shared/Banner";

import blogBanner from "../assets/images/banner.jpg";

const Blogs = () => {
  return (
    <section className="section-container section-inner-space">
      <Banner
        banner={blogBanner}
        title="آموزشهای رایگان وب سایت"
        description="در این صفحه می‌توانید مجموعه‌ای از آموزشهای رایگان و نوشته‌های ما را مشاهده کنید که با دقت و توجه به موضوعات روز تهیه شده‌اند. هدف ما ارائه محتوای آموزنده، جذاب و کاربردی برای شماست. هر هفته مطالب جدید اضافه می‌کنیم تا همراه همیشگی شما در مسیر یادگیری و رشد باشیم. از بازخوردها و نظرات ارزشمندتان استقبال می‌کنیم!"
      />
    </section>
  );
};

export default Blogs;
