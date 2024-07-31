export type productType = {
  attributes: {
    title: string;
    image: {
      data: {
        attributes: {
          name: string;
          url: string;
        };
      };
    };
    price: number;
  };
  id: number;
};
