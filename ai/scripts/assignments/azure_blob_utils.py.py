import os
from azure.storage.blob import (
    BlobServiceClient,
    BlobClient,
    ContainerClient,
    __version__,
)
import secret


def upload_file(container_name, local_file_path, remote_file_path):
    """uploads a file in azure blob and returns its url
    Args:
        container_name (str): name of the subject
        local_file_path (str): path of file
        remote_file_path (str): path of destination file
    Returns:
        str: url of file
    """
    connect_str = secret.AZURE_STORAGE_CONNECTION_STRING

    try:
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
        blob_client = blob_service_client.get_blob_client(
            container=container_name, blob=remote_file_path
        )

        with open(local_file_path, "rb") as data:
            blob_client.upload_blob(data)

        return blob_client.url

    except Exception as e:
        print("Error: ", e)
        return {"error": e}


def download_file(container_name, tag):
    """download a file from storage blob
    Args:
        container_name (str): subject name
        tag (str): topic
    Returns:
        null: downloads file to local storage dump
    """
    try:
        connect_str = secret.AZURE_STORAGE_CONNECTION_STRING
        blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    except Exception as e:
        return {"msg": "error connecting to blob"}

    files = list_files(container_name, tag)

    for file in files:
        filename = file.split("/")[-1]
        DIR = os.path.join("DUMP", filename)
        blob_client = blob_service_client.get_blob_client(
            container=container_name, blob=file
        )

        with open(DIR, "wb") as download_file:
            download_file.write(blob_client.download_blob().readall())


def list_files(container_name, tag):
    """lists file in blob
    Args:
        container_name (str): subject
        tag (str): topic
    Returns:
        list: list of files
    """
    connect_str = secret.AZURE_STORAGE_CONNECTION_STRING
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_client = blob_service_client.get_container_client(container_name)

    answer_dir = "assignments/{topic}/answer/".format(topic=tag)
    blob_list = container_client.list_blobs(name_starts_with=answer_dir)

    file_list = []
    for blob in blob_list:
        file_list.append(str(blob.name))

    return file_list


def get_file_url(container, tag):
    """get urls of files in storage blob
    Args:
        container (str): subject
        tag ([type]): topic
    Returns:
        list: file URLs
    """
    files_list = list_files(container, tag)
    url_list = []
    for file in files_list:
        filename = file.split("/")[-1]
        filename = filename.replace(" ", "%20")
        # print(filename)
        FILE_URL = "https://aquabucket.blob.core.windows.net/{sub}/assignments/{topic}/answer/{fname}".format(
            sub=container, topic=tag, fname=filename
        )
        url_list.append(FILE_URL)

    return url_list
