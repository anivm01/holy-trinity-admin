const UNSPLASH_PARAMS = "?auto=format&fit=crop&w=1400&q=80";

export const communityNewsPosts = [
  {
    id: 104,
    title_en: "Parish council update",
    title_bg: "Новини от църковното настоятелство",
    body_en: "",
    body_bg: "",
    author: "Church Office",
    publish_date: "2026-11-20T10:30:00",
    status: "published",
    media: [],
  },
  {
    id: 103,
    title_en: "December volunteer schedule",
    title_bg: "График на доброволците за декември",
    body_en:
      "The December volunteer schedule is being prepared. Please contact the church office if you would like to help with services or community events.",
    body_bg:
      "Подготвя се графикът на доброволците за декември. Моля, свържете се с църковния офис, ако желаете да помогнете по време на службите или обществените събития.",
    author: "Church Office",
    publish_date: "2026-11-19T14:00:00",
    status: "draft",
    media: [],
  },
  {
    id: 101,
    title_en: "A joyful Sunday with our parish community",
    title_bg: "Радостна неделя с нашата църковна общност",
    body_en:
      "Thank you to everyone who joined us for worship and fellowship. We are grateful for every family, volunteer, and visitor who shared the day with us.",
    body_bg:
      "Благодарим на всички, които се присъединиха към богослужението и общата трапеза. Благодарни сме на всяко семейство, доброволец и гост, които споделиха деня с нас.",
    author: "Holy Trinity Parish",
    publish_date: "2026-11-15T12:30:00",
    status: "published",
    media: [
      {
        type: "image",
        url: `https://images.unsplash.com/photo-1766386795034-da17ad2781d9${UNSPLASH_PARAMS}`,
        comment_en: "Our parish gathered together for Sunday worship.",
        comment_bg: "Нашата църковна общност се събра за неделното богослужение.",
        credit: "Kaylee Stoll",
        source_url:
          "https://unsplash.com/photos/people-gathered-inside-a-church-during-a-service-vFHm1J-ZhIQ",
      },
      {
        type: "image",
        url: `https://images.unsplash.com/photo-1760367120301-a6838ae553d7${UNSPLASH_PARAMS}`,
        comment_en: "A quiet moment of prayer and reflection.",
        comment_bg: "Тих момент за молитва и размисъл.",
        credit: "Christian Harb",
        source_url:
          "https://unsplash.com/photos/a-diverse-crowd-of-people-gathered-indoors-aeQuYBwBRYQ",
      },
      {
        type: "image",
        url: `https://images.unsplash.com/photo-1772617616408-d13984d4cbd1${UNSPLASH_PARAMS}`,
        comment_en: "Friends and families gathered outside the church.",
        comment_bg: "Приятели и семейства се събраха пред църквата.",
        credit: "Alessandro Autiero",
        source_url:
          "https://unsplash.com/photos/group-of-people-gathered-in-front-of-a-church-7tpPQD-67Mk",
      },
    ],
  },
  {
    id: 102,
    title_en: "Remembering our shared life of faith",
    title_bg: "Спомен за общия ни живот във вярата",
    body_en: "",
    body_bg: "",
    author: "Holy Trinity Parish",
    publish_date: "2026-10-25T11:45:00",
    status: "published",
    media: [
      {
        type: "image",
        url: `https://images.unsplash.com/photo-1777497478187-52e38a650caa${UNSPLASH_PARAMS}`,
        comment_en: "The congregation facing the altar during worship.",
        comment_bg: "Църковната общност по време на богослужение.",
        credit: "Trac Vu",
        source_url:
          "https://unsplash.com/photos/people-sitting-in-a-church-facing-the-altar-rhjJFkoZ6Gs",
      },
    ],
  },
];
