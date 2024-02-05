import React from "react";
import { useSelector } from "react-redux";

const TeacherProfilePage = () => {
  const profile = useSelector((state) => state.teacherProfile.value);

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
          <p className="ml-10 font-semibold">Teacher</p>
          <p className="ml-10 font-semibold">
            {profile.educationalCredentials}
          </p>
          <p className="ml-10 font-semibold">{profile.subjectsTaught}</p>
          <p className="ml-10 font-semibold">{profile.availableTimeSlots}</p>
          <p className="ml-10 font-semibold">{profile.rating} star</p>
          <p className="ml-10 font-semibold">{profile.personality}</p>
        </div>
      </div>
      <p class="mb-4 text-m font-semibold text-teal-900 w-[1000px]">
        Greetings! I'm Jane Smith, your dedicated guide on the fascinating
        journey of education. Holding a Bachelor's Degree in Education, I've
        become a passionate advocate for transforming learning into a memorable
        and inspiring adventure. My expertise lies in Mathematics and English,
        where I strive to turn intricate subjects into captivating explorations.
        I believe in fostering an inclusive and interactive classroom
        atmosphere, aiming not only for comprehension but also for the genuine
        excitement of acquiring knowledge. Having navigated through the
        challenges of both A-levels and O-levels, I bring a unique blend of
        experience and empathy to my teaching approach. I weave traditional
        methods with real-world applications, ensuring each lesson leaves a
        lasting impression on my students. I'm not just about imparting
        knowledge; I'm a catalyst for growth and curiosity. My four-star rating
        reflects the positive impact I've had on my students. With a constant
        commitment to refining my methods, I am always on the lookout for
        innovative ways to enrich the learning experience. Beyond the classroom,
        I'm a perpetual learner myself. You'll often find me exploring the
        latest teaching methodologies, attending workshops, and immersing myself
        in the world of educational literature. My dedication to staying ahead
        of the curve ensures my students are well-equipped for the challenges of
        the modern world. Whether inside the classroom or out, I'm not just a
        teacher; I'm a mentor, a guide, and a friend. Step into my world, where
        education is not just about grades but about building a foundation for a
        lifelong love of learning. Join me, and let's embark on this educational
        adventure together!
      </p>
    </div>
  );
};

export default TeacherProfilePage;
