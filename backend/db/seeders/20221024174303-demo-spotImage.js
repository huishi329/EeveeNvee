'use strict';
const { Op } = require('sequelize');
const { uploadImageFromUrl } = require('../../aws');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/1ac7e1c6-e80b-4b74-9377-245c55c208d3.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 1,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/7a42e674-0637-4634-9465-e5707815e6d6.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 1,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/de921e43-7e10-42fd-8b64-4199c46603d8.jpg?im_w=720"),
        position: 2
      },
      {
        spotId: 1,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-24372539/original/aba4cc27-4002-4b96-aa59-42e7ae48c28e.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 1,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/ef7c4bdc-8ffd-4ef6-8595-7f5f3f30bd09.jpg?im_w=720"),
        position: 4
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/a6e4ce86-787a-46a2-9dd5-a11f718210ad.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/a4489b02-446e-4d04-ad1d-ec6e99fa3951.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/ec52819a-773f-4a58-afff-985c06f1a7a2.jpeg?im_w=720"),
        position: 2
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/3a2b3d7d-6558-4f5f-89bb-533d128250de.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 2,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-42393959/original/105dd825-aa8d-4f81-933f-a0a4c15885f3.jpeg?im_w=720"),
        position: 4
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/888ee016-a166-4bc5-a33d-7b6252fdec3a.jpg?im_w=720"),
        position: 0
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/3c1545d5-f0f7-476d-88f6-7814a32f5ab7.jpg?im_w=720"),
        position: 1
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/ceb857a2-a475-4dfd-a29a-4e1746065293.jpg?im_w=720"),
        position: 2
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/b52f2b73-e836-4b32-bbd2-7d5353faba17.jpg?im_w=720"),
        position: 3
      },
      {
        spotId: 3,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/84515aff-63ed-45ec-aa29-5f450554c929.jpg?im_w=720"),
        position: 4
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/56820091-2b3b-47a8-9685-a263ba226c97.jpg?im_w=720"),
        position: 0
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/64bee86e-700a-4dd0-8aa3-be6c9fee0b27.jpg?im_w=720"),
        position: 1
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/4bea784f-0063-479e-909d-28d2f3d083ab.jpg?im_w=720"),
        position: 2
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/81a13e43-fa6a-4241-bb8e-b606549b7ee3.jpg?im_w=720"),
        position: 3
      },
      {
        spotId: 4,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/f5c14bb7-9c7a-45bf-ab7f-23a610892da0.jpg?im_w=720"),
        position: 4
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/e28d45ab-175b-45e4-9e22-9f2fc12b30df.jpg?im_w=720"),
        position: 0
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/a4ea4652-8069-472f-b551-d322341c305f.jpg?im_w=720"),
        position: 1
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/1f7bdfa9-5643-4f1d-8b04-d75a3f7031ad.jpg?im_w=720"),
        position: 2
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/5f1f9497-14eb-4057-a9c8-b02a10367d13.jpg?im_w=720"),
        position: 3
      },
      {
        spotId: 5,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/e61136e2-56fe-4f0f-a39d-941521347914.jpg?im_w=720"),
        position: 4
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/3fd4c55d-d312-4a9b-8ea1-f32d9cd7f986.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/01918869-3140-44ca-b1a5-bc0ad5607333.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/908ab2b2-f016-4577-9a56-eb3213470afe.jpeg?im_w=720"),
        position: 2
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/2cd4ecd9-19bb-4836-b62a-4e7a2e94f748.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 6,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-43257372/original/af7466f5-f4d6-49bf-9886-f81efe1d772f.jpeg?im_w=720"),
        position: 4
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/738c71e0-c68c-4f8e-809a-826c4f6c27a0.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/8d7807d2-9557-4757-ae00-b1cad54b94da.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/0f9f7471-ddc1-4eed-a25a-2df69f5bae0e.jpeg?im_w=720"),
        position: 2
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/6461d602-eb57-420d-a21a-40db8b3abb5e.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 7,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/prohost-api/Hosting-624018740377905048/original/0c8dcd15-af42-4aa6-95a1-8880ab7c920c.jpeg?im_w=720"),
        position: 4
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/f4d8c0f7-de93-4c7b-ac61-59c5686c34ae.jpg?im_w=720"),
        position: 0
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/709e44b4-d304-462a-9105-88b5b03dd69e.jpg?im_w=720"),
        position: 1
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/2d4e0a49-8944-4c46-ac96-43069aa94769.jpg?im_w=720"),
        position: 2
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/54096a28-de1c-4e51-ac5b-6972cef32d79.jpg?im_w=720"),
        position: 3
      },
      {
        spotId: 8,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/0db455c7-20d6-4b7b-9e5d-9ac0041b007b.jpg?im_w=720"),
        position: 4
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/5bd69eb7-e4ae-4615-97b7-440f1658683c.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/708fb461-5cdb-4a35-8e8e-87d2043dbd41.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/150e8819-9d4b-4a23-8776-d625dce687c8.jpeg?im_w=720"),
        position: 2
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/eaac5b69-dbc9-460f-a0ec-c7875fecdec2.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 9,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-713898202877836679/original/6e817503-eca3-486e-ba08-a59a972bf368.jpeg?im_w=720"),
        position: 4
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/bcc58a39-61bf-45fb-998a-acfe45039582.jpeg?im_w=720"),
        position: 0
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/9ede4bcd-6b6e-4506-ba7a-8be973ccf537.jpeg?im_w=720"),
        position: 1
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/469ec396-f4a5-4771-8246-1e707761a340.jpeg?im_w=720"),
        position: 2
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/e21092de-9996-443e-9792-a1e4f75b2c3c.jpeg?im_w=720"),
        position: 3
      },
      {
        spotId: 10,
        url: await uploadImageFromUrl("https://a0.muscache.com/im/pictures/miso/Hosting-714327938077410431/original/9fe3b0df-db0b-4133-934f-d1081f8d08a6.jpeg?im_w=720"),
        position: 4
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('SpotImages', {
      id: {
        [Op.in]: [...Array(50).keys()]
      }
    });
  }
};
