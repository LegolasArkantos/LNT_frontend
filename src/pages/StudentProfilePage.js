import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const StudentProfilePage = () => {
  const profile = useSelector((state) => state.studentProfile.value);

  return (
    <div class="">
      <div class="flex items-center  mb-8">
        <img
          class="bg-teal-200 rounded-full outline outline-teal-700 w-[350px] h-[350px]"
          src="/docs/images/people/profile-picture-1.jpg"
          alt="Jese Leos"
        />
        <div>
          <p class="text-4xl ml-10 font-bold leading-none text-gray-900 dark:text-white">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="ml-10 font-semibold">Student</p>
          <p className="ml-10 font-semibold">{profile.educationalLevel}</p>
          <p className="ml-10 font-semibold">{profile.personality}</p>
        </div>
      </div>
      <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        Hello there! 👋 I'm Uzair Ali Nusrat, a passionate computer science
        enthusiast currently navigating the exciting journey of pursuing a
        Master's degree in Computer Science. 🎓 My curiosity for all things tech
        and my love for problem-solving have been the driving forces behind my
        academic and personal pursuits. In the vast realm of computer science,
        my interests are diverse, ranging from artificial intelligence and
        machine learning to software development and data science. I am
        constantly fueled by the desire to explore innovative solutions to
        real-world challenges and contribute to the ever-evolving landscape of
        technology. During my academic journey, I've had the opportunity to work
        on a variety of projects, each presenting its unique set of challenges
        and learning experiences. Whether it's delving into the intricacies of
        algorithm design, coding up robust software applications, or harnessing
        the power of data to derive meaningful insights, I thrive on the
        intellectual stimulation that computer science offers. In addition to my
        technical skills, I value collaboration and effective communication. I
        believe that the synergy of diverse perspectives is essential for
        fostering creativity and producing impactful results. As a continuous
        learner, I am open to new ideas, technologies, and methodologies, always
        seeking to expand my knowledge and refine my skill set. Beyond the
        screen, you can find me engaging in thought-provoking discussions about
        the latest advancements in technology, experimenting with coding
        challenges, or immersing myself in a good book on computer science or
        related topics. I am excited about the possibilities that the future
        holds and look forward to contributing my skills and knowledge to the
        ever-evolving world of computer science. Let's connect, collaborate, and
        code our way into the future! 💻🚀
      </p>
    </div>
  );
};

export default StudentProfilePage;
