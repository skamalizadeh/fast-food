import useAxios from "./useAxios";

function ForAxiosTestT() {
  const { response, loading, error } = useAxios({
    method: "get",
    url: "/list",
  });
  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : (
        response.map((item) => {
          return <p>{item.name}</p>;
        })
      )}
    </div>
  );
}
export default ForAxiosTestT;
