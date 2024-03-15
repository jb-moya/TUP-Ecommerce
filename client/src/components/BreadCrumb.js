import { Breadcrumb } from "react-bootstrap";

const BreadCrumb = (currentPath) => {
    const path = currentPath.currentPath;

    const paths = path.split("/");

    return (
        <Breadcrumb className="custom-breadcrumb">
            <Breadcrumb.Item href="/">TUP Merch Co.</Breadcrumb.Item>
            {paths.map((path, index) => {
                if (path === "") {
                    return null;
                }

                return (
                    <Breadcrumb.Item key={index} href={`/${path}`}>
                        {path}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};

export default BreadCrumb;
